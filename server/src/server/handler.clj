(ns server.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [jopbox.client :refer :all]
            [ring.util.response :refer [response]]
            [ring.middleware.json :refer [wrap-json-response]]))

;(def app-key (System/getenv "DROPBOX_APP_KEY"))
;(def app-secret (System/getenv "DROPBOX_APP_SECRET"))
;
;(def consumer (make-consumer app-key app-secret))
;(def request-token (fetch-request-token consumer))

(defroutes app-routes

  (GET "/categories" []
    (response ["Travel" "Nature" "People" "Inspiration" "Other"]))

  (GET "/pictures/:category" [category]
    (response [{ :thumbnail "1453387_10153573511785500_1899755281_n.jpg" :actual "1453387_10153573511785500_1899755281_n.jpg" }
               { :thumbnail "1501290_10153594457450500_512797407_o.jpg" :actual "1501290_10153594457450500_512797407_o.jpg" }
               { :thumbnail "10919772_10204037928682634_3559155281616018900_o.jpg" :actual "10919772_10204037928682634_3559155281616018900_o.jpg"  }
               { :thumbnail "11537596_10205200764592805_3267665941076830075_o.jpg" :actual "11537596_10205200764592805_3267665941076830075_o.jpg" }]))

  (route/files "/")
  (route/not-found "Page not found"))

(defn wrap-dir-index [handler]
  (fn [req]
    (handler
      (update-in req [:uri]
        #(if (= "/" %) "/index.html" %)))))

(def app (-> (routes app-routes) (wrap-json-response) (wrap-dir-index)))
