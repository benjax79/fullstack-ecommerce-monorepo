CREATE Table cliente(
    id_cliente serial PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR (255) not NULL,
    creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE Table producto(
    id_producto serial PRIMARY key,
    nombre VARCHAR(100) not null,
    categoria VARCHAR(50) not null,
    color VARCHAR(20) not null,
    stock INT DEFAULT 0 not null CHECK(stock >=0),
    precio int not null CHECK(precio >=0) ,
    descripcion TEXT,
    imagen TEXT,
    activo BOOLEAN DEFAULT TRUE NOT NULL   
);
create table cliente_producto(
    id_cliente INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT DEFAULT 1 CHECK(cantidad > 0),
    PRIMARY KEY(id_cliente,id_producto),
    Foreign Key (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE,
    Foreign Key (id_producto) REFERENCES producto(id_producto)
);
CREATE Table boleta(
    id_boleta serial PRIMARY KEY,
    id_cliente INT NOT NULL,
    descuento INT DEFAULT 0 CHECK(descuento >= 0),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
    precio_total int not NULL CHECK(precio_total >= 0),
    direccion_envio text,
    estado VARCHAR (20) DEFAULT 'PENDIENTE',
    metodo_pago VARCHAR(20),
    Foreign Key (id_cliente) REFERENCES cliente(id_cliente)
);
CREATE Table boleta_producto(
    id_boleta int NOT NULL,
    id_producto int NOT NULL,
    precio_unidad int NOT NULL CHECK(precio_unidad >= 0),
    cantidad INT DEFAULT 0 not NULL CHECK(cantidad > 0),
    PRIMARY KEY(id_boleta,id_producto),
    Foreign Key (id_boleta) REFERENCES boleta(id_boleta) ON DELETE CASCADE,
    Foreign Key (id_producto) REFERENCES producto(id_producto)
)

