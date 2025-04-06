package main

import (
	"net/http"
)

// var upgrader = websocket.Upgrader{
// 	CheckOrigin: func(r *http.Request) bool { return true },
// }

// func handleConnections(w http.ResponseWriter, r *http.Request) {
// 	ws, err := upgrader.Upgrade(w, r, nil)
// 	if(err != nil)

// }

func main() {
	http.HandleFunc("POST /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("fuck off"))
	})

	http.ListenAndServe(":8080", nil)
}
