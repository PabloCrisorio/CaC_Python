from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:1234@localhost:3306/cacgrupo19'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Definir la tabla 
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    precio=db.Column(db.Integer)
    tipo=db.Coolumn(db.String(50))
    stock=db.Column(db.Integer)
    imagen=db.Column(db.String(400))

    def __init__(self,nombre,precio,tipo,stock,imagen):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio=precio
        self.tipo=tipo
        self.stock=stock
        self.imagen=imagen

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    usuario=db.Coolumn(db.String(50))
    password=db.Column(db.String(50))

    def __init__(self,nombre,usuario,password):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.usuario=usuario
        self.password=password


with app.app_context():
    db.create_all()
@app.route("/")
def index():
    return f'App GuitarShop'

@app.route("/registro_producto", methods=['POST']) 
def registro_producto():
    # {"nombre": "Felipe", ...} -> input tiene el atributo name="nombre"
    nombre_recibido = request.json["nombre"]
    precio=request.json['precio']
    tipo=request.json['tipo']
    stock=request.json['stock']
    imagen=request.json['imagen']
    nuevo_registro = Producto(nombre=nombre_recibido,precio=precio,tipo=tipo,stock=stock,imagen=imagen)
    db.session.add(nuevo_registro)
    db.session.commit()
    return "Solicitud de post recibida"
    
@app.route("/registro_usuario", methods=['POST']) 
def registro_usuario():
    nombre_recibido = request.json["nombre"]
    usuario=request.json['usuario']
    password=request.json['password']
    nuevo_registro = Producto(nombre=nombre_recibido,usuario=usuario,password=password)
    db.session.add(nuevo_registro)
    db.session.commit()
    return "Solicitud de post recibida"

@app.route("/usuarios",  methods=['GET'])
def productos():
    all_registros = Usuario.query.all()
    data_serializada = []
    for objeto in all_registros:
        data_serializada.append({"id":objeto.id, "nombre":objeto.nombre, "usuario":objeto.usuario, "password":objeto.password})
    return jsonify(data_serializada)

@app.route("/productos",  methods=['GET'])
def productos():
    # Consultar en la tabla todos los registros
    # all_registros -> lista de objetos
    all_registros = Producto.query.all()
    # Lista de diccionarios
    data_serializada = []
    for objeto in all_registros:
        data_serializada.append({"id":objeto.id, "nombre":objeto.nombre, "precio":objeto.precio, "tipo":objeto.tipo, "stock":objeto.stock, "imagen":objeto.imagen})
    return jsonify(data_serializada)


@app.route('/update/<id>', methods=['PUT'])
def update(id):
    producto = Producto.query.get(id)
    nombre = request.json["nombre"]
    precio=request.json['precio']
    tipo=request.json['tipo']
    stock=request.json['stock']
    imagen=request.json['imagen']
    producto.nombre=nombre
    producto.precio=precio
    producto.stock=stock
    producto.imagen=imagen
    db.session.commit()
    data_serializada = [{"id":producto.id, "nombre":producto.nombre, "precio":producto.precio, "tipo":producto.tipo, "stock":producto.stock, "imagen":producto.imagen}]
    return jsonify(data_serializada)

   
@app.route('/borrar/<id>', methods=['DELETE'])
def borrar(id):
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    data_serializada = [{"id":producto.id, "nombre":producto.nombre, "precio":producto.precio, "tipo":producto.tipo, "stock":producto.stock, "imagen":producto.imagen}]
    return jsonify(data_serializada)


if __name__ == "__main__":
    app.run(debug=True)

