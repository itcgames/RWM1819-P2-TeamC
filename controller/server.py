from tornado import websocket, web, ioloop, httpserver
import tornado
import json

session = {}
gameAvailable = False

class WSHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        print("Check Origin")
        return True

    def open(self):
        print("Connection Opened")

    def on_message(self, message):

        global gameAvailable

        print("Message Received")
        print("Associated Web Socket Handler: " + str(tornado.websocket.WebSocketHandler))

        msg = json.loads(message)

        if msg["type"] == "connect":
            if msg["data"] == "game":
                session["game"] = self
                gameAvailable = True
            elif msg["data"] == "controller":
                session["controller"] = self
                print("controller conencted")
        elif (msg["type"] == "vec" or msg["type"] == "pause") and gameAvailable == True:
            session["game"].write_message(msg["data"])
            print("Sent Message: " + msg["type"])

    def on_close(self): # Can handle closing of client pages without breaking
        global gameAvailable
        print("Close Event")
        if session.get("game") == self:
            gameAvailable = False

app= tornado.web.Application([
        	#map the handler to the URI named "test"
        	(r'/wstest', WSHandler),
])

if __name__ == '__main__':
        	server_port=8080
        	app.listen(server_port)
        	ioloop.IOLoop.instance().start()
