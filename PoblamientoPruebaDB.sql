-- Limpiar tablas existentes
TRUNCATE TABLE boleta_producto, cliente_producto, boleta, producto, cliente RESTART IDENTITY CASCADE;

-- Insertar clientes
INSERT INTO cliente (nombre, apellido, correo, password) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '$2b$10$examplehash1'),
('María', 'González', 'maria.gonzalez@email.com', '$2b$10$examplehash2'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '$2b$10$examplehash3'),
('Ana', 'Martínez', 'ana.martinez@email.com', '$2b$10$examplehash4'),
('Luis', 'López', 'luis.lopez@email.com', '$2b$10$examplehash5');

-- Insertar productos de maquillaje
INSERT INTO producto (nombre, categoria, color, stock, precio, descripcion, imagen) VALUES
('Labial Mate', 'Labios', 'Rojo', 50, 8500, 'Labial de larga duración con acabado mate', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'),
('Base de Maquillaje', 'Rostro', 'Beige', 30, 18000, 'Base líquida cobertura media', 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400'),
('Máscara de Pestañas', 'Ojos', 'Negro', 45, 12000, 'Máscara voluminizadora resistente al agua', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'),
('Paleta de Sombras', 'Ojos', 'Multicolor', 20, 25000, 'Paleta con 12 tonos nude y ahumados', 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400'),
('Rubor en Polvo', 'Rostro', 'Rosa', 35, 9500, 'Rubor compacto con acabado natural', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400'),
('Delineador Líquido', 'Ojos', 'Negro', 40, 7000, 'Delineador de precisión punta fina', 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400'),
('Gloss Labial', 'Labios', 'Transparente', 55, 6500, 'Brillo labial hidratante con shimmer', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'),
('Polvo Compacto', 'Rostro', 'Translúcido', 25, 15000, 'Polvo matificante fijador de maquillaje', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'),
('Corrector Ojeras', 'Rostro', 'Natural', 30, 11000, 'Corrector alta cobertura iluminador', 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400'),
('Lápiz de Cejas', 'Cejas', 'Castaño', 60, 5500, 'Lápiz retráctil para definir cejas', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'),
('Iluminador en Polvo', 'Rostro', 'Dorado', 28, 13500, 'Iluminador para pómulos y arco de cupido', 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400'),
('Primer Facial', 'Rostro', 'Transparente', 22, 16500, 'Primer hidratante para preparar la piel', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400'),
('Primer Facial', 'Rostro', 'Transparente', 22, 16500, 'Primer hidratante para preparar la piel', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400');

-- Insertar productos en carrito de clientes
INSERT INTO cliente_producto (id_cliente, id_producto, cantidad) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1),
(2, 5, 2),
(3, 4, 1),
(4, 6, 3),
(5, 7, 2);

-- Insertar boletas
INSERT INTO boleta (id_cliente, descuento, precio_total, direccion_envio, estado, metodo_pago) VALUES
(1, 0, 29000, 'Av. Principal 123, Santiago', 'COMPLETADO', 'TARJETA'),
(2, 2000, 25500, 'Calle Falsa 456, Valparaíso', 'ENVIADO', 'TRANSFERENCIA'),
(3, 0, 25000, 'Pasaje Los Aromos 789, Concepción', 'PENDIENTE', 'EFECTIVO'),
(4, 5000, 16000, 'Av. Libertador 321, La Serena', 'COMPLETADO', 'TARJETA'),
(5, 0, 13000, 'Calle Nueva 654, Temuco', 'PROCESANDO', 'PAYPAL');

-- Insertar detalle de productos en boletas
INSERT INTO boleta_producto (id_boleta, id_producto, precio_unidad, cantidad) VALUES
(1, 1, 8500, 2),   -- Boleta 1: Labiales
(1, 3, 12000, 1),  -- Boleta 1: Máscara
(2, 2, 18000, 1),  -- Boleta 2: Base
(2, 5, 9500, 1),   -- Boleta 2: Rubor
(3, 4, 25000, 1),  -- Boleta 3: Paleta
(4, 6, 7000, 3),   -- Boleta 4: Delineadores
(5, 7, 6500, 2);   -- Boleta 5: Gloss



select * from producto limit 3 OFFSET 2