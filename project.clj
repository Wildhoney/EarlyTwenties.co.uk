(defproject server "0.1.0"
  :description "Photography portfolio for Maria written in React (with Redux, Keo) using Babel to transpile to ES5."
  :url "https://earlytwenties.herokuapp.com/"
  :min-lein-version "2.0.0"
  :source-paths ["server/src"]
  :resource-paths ["server/run/resource"]
  :target-path "server/run/%s/"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [compojure "1.4.0"]
                 [ring/ring-defaults "0.1.5"]]
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler server.handler/app}
  :profiles
  {:dev{:plugins [[jonase/eastwood "0.2.2"]]
        :dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.0"]]}})
