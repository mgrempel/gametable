package hub

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{ReadBufferSize: 1024, WriteBufferSize: 1024}

type Client struct {
	conn *websocket.Conn
	send chan []byte
}

func (c *Client) readPipeline() {
	defer func() {
		c.conn.Close()
	}()

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			log.Printf("Error: %v", err)
		}
		fmt.Println(message)
	}
}

func Serve(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{conn: conn, send: make(chan []byte, 256)}

}
