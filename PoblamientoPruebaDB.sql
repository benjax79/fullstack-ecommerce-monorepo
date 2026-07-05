-- Limpiar tablas existentes
TRUNCATE TABLE boleta_producto, cliente_producto, boleta, producto, cliente RESTART IDENTITY CASCADE;

-- Insertar clientes
INSERT INTO cliente (nombre, apellido, email, password) VALUES
('Juan', 'Pérez', 'juan.perez@email.com', '$2b$10$examplehash1'),
('María', 'González', 'maria.gonzalez@email.com', '$2b$10$examplehash2'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', '$2b$10$examplehash3'),
('Ana', 'Martínez', 'ana.martinez@email.com', '$2b$10$examplehash4'),
('Luis', 'López', 'luis.lopez@email.com', '$2b$10$examplehash5');

-- Insertar productos de maquillaje
INSERT INTO producto (nombre, categoria, color, stock, precio, descripcion, imagen) VALUES
('Labial Mate', 'Labios', 'Rojo', 50, 8500, 'Labial de larga duración con acabado mate', '/products/prod_1.jpg'),
('Base de Maquillaje', 'Rostro', 'Beige', 30, 18000, 'Base líquida cobertura media', '/products/prod_2.jpg'),
('Máscara de Pestañas', 'Ojos', 'Negro', 45, 12000, 'Máscara voluminizadora resistente al agua', '/products/prod_3.jpg'),
('Paleta de Sombras', 'Ojos', 'Nude', 20, 25000, 'Paleta con 12 tonos nude y ahumados', '/products/prod_4.jpg'),
('Rubor en Polvo', 'Rostro', 'Rosa', 35, 9500, 'Rubor compacto con acabado natural', '/products/prod_5.jpg'),
('Delineador Líquido', 'Ojos', 'Negro', 40, 7000, 'Delineador de precisión punta fina', '/products/prod_6.jpg'),
('Gloss Labial', 'Labios', 'Transparente', 55, 6500, 'Brillo labial hidratante con shimmer', '/products/prod_7.jpg'),
('Polvo Compacto', 'Rostro', 'Transparente', 25, 15000, 'Polvo matificante fijador de maquillaje', '/products/prod_8.jpg'),
('Corrector Ojeras', 'Rostro', 'Beige', 30, 11000, 'Corrector alta cobertura iluminador', '/products/prod_9.jpg'),
('Lápiz de Cejas', 'Cejas', 'Cafe', 60, 5500, 'Lápiz retráctil para definir cejas', '/products/prod_10.jpg'),
('Iluminador en Polvo', 'Rostro', 'Dorado', 28, 13500, 'Iluminador para pómulos y arco de cupido', '/products/prod_11.jpg'),
('Primer Facial', 'Rostro', 'Transparente', 22, 16500, 'Primer hidratante para preparar la piel', '/products/prod_12.jpg'),
('Labial Líquido Mate', 'Labios', 'Rojo', 45, 9500, 'Labial líquido de larga duración 24hrs', '/products/prod_13.jpg'),
('Labial Cremoso', 'Labios', 'Rosa', 38, 7800, 'Labial hidratante con vitamina E', '/products/prod_14.jpg'),
('Delineador de Labios', 'Labios', 'Nude', 60, 4500, 'Lápiz delineador cremoso para contorno', '/products/prod_15.jpg'),
('Labial Metálico', 'Labios', 'Rosa', 30, 10500, 'Acabado metálico brillante', '/products/prod_16.jpg'),
('Bálsamo Labial con Color', 'Labios', 'Rosa', 70, 5500, 'Hidratación con toque de color', '/products/prod_17.jpg'),
('Labial Satinado', 'Labios', 'Cafe', 42, 8800, 'Acabado satinado elegante', '/products/prod_18.jpg'),
('Tinta de Labios', 'Labios', 'Rojo', 55, 7200, 'Efecto natural de larga duración', '/products/prod_19.jpg'),
('Labial Nude', 'Labios', 'Beige', 48, 8200, 'Tono natural para uso diario', '/products/prod_20.jpg'),
('Set de Mini Labiales', 'Labios', 'Rojo', 25, 18500, 'Set de 5 tonos variados', '/products/prod_21.jpg'),
('Labial Plumper', 'Labios', 'Rosa', 35, 11000, 'Efecto voluminizador instantáneo', '/products/prod_22.jpg'),
('Base Matte Full Coverage', 'Rostro', 'Beige', 28, 22000, 'Cobertura total acabado mate', '/products/prod_23.jpg'),
('Base Luminosa', 'Rostro', 'Beige', 32, 19500, 'Acabado luminoso natural', '/products/prod_24.jpg'),
('BB Cream', 'Rostro', 'Beige', 50, 14000, 'Hidratación y cobertura ligera SPF30', '/products/prod_25.jpg'),
('CC Cream', 'Rostro', 'Beige', 45, 15500, 'Corrector de color con protección solar', '/products/prod_26.jpg'),
('Contorno en Crema', 'Rostro', 'Dorado', 38, 12500, 'Contorno cremoso fácil de difuminar', '/products/prod_27.jpg'),
('Contorno en Polvo', 'Rostro', 'Cafe', 40, 11000, 'Contorno en polvo natural', '/products/prod_28.jpg'),
('Bronzer', 'Rostro', 'Dorado', 35, 13500, 'Bronceador para efecto verano', '/products/prod_29.jpg'),
('Iluminador Líquido', 'Rostro', 'Dorado', 42, 14500, 'Iluminador fluido multiusos', '/products/prod_30.jpg'),
('Iluminador en Stick', 'Rostro', 'Blanco', 30, 12000, 'Aplicación precisa y fácil', '/products/prod_31.jpg'),
('Rubor Líquido', 'Rostro', 'Rosa', 48, 9800, 'Acabado natural y fresco', '/products/prod_32.jpg'),
('Rubor en Crema', 'Rostro', 'Rojo', 36, 10200, 'Textura cremosa buildable', '/products/prod_33.jpg'),
('Setting Spray', 'Rostro', 'Transparente', 55, 16000, 'Fijador de maquillaje 16hrs', '/products/prod_34.jpg'),
('Polvo Suelto', 'Rostro', 'Transparente', 40, 14000, 'Polvo fijador ultrafino', '/products/prod_35.jpg'),
('Primer Poros', 'Rostro', 'Transparente', 33, 18000, 'Minimiza poros y líneas finas', '/products/prod_36.jpg'),
('Primer Iluminador', 'Rostro', 'Rosa', 28, 17500, 'Base luminosa con partículas', '/products/prod_37.jpg'),
('Paleta Sombras Nude', 'Ojos', 'Nude', 25, 28000, 'Paleta 18 tonos nude esenciales', '/products/prod_38.jpg'),
('Paleta Sombras Coloridas', 'Ojos', 'Rosa', 20, 32000, 'Paleta 24 tonos vibrantes', '/products/prod_39.jpg'),
('Sombra Individual Shimmer', 'Ojos', 'Dorado', 50, 6500, 'Sombra con brillo intenso', '/products/prod_40.jpg'),
('Sombra Individual Mate', 'Ojos', 'Cafe', 55, 6000, 'Sombra mate altamente pigmentada', '/products/prod_41.jpg'),
('Delineador en Gel', 'Ojos', 'Negro', 45, 8500, 'Delineador waterproof larga duración', '/products/prod_42.jpg'),
('Delineador Colorido', 'Ojos', 'Azul', 35, 7500, 'Delineador líquido color intenso', '/products/prod_43.jpg'),
('Lápiz Kajal', 'Ojos', 'Negro', 60, 5500, 'Lápiz suave para línea de agua', '/products/prod_44.jpg'),
('Máscara Volumen Extremo', 'Ojos', 'Negro', 40, 14500, 'Volumen dramático sin grumos', '/products/prod_45.jpg'),
('Máscara Alargadora', 'Ojos', 'Negro', 42, 13000, 'Efecto pestañas XXL', '/products/prod_46.jpg'),
('Máscara Waterproof', 'Ojos', 'Negro', 38, 15000, 'Resistente al agua y sudor', '/products/prod_47.jpg'),
('Máscara de Color', 'Ojos', 'Azul', 25, 11500, 'Máscara colorida para looks creativos', '/products/prod_48.jpg'),
('Primer de Ojos', 'Ojos', 'Nude', 35, 10000, 'Base para sombras larga duración', '/products/prod_49.jpg'),
('Glitter para Ojos', 'Ojos', 'Blanco', 30, 7000, 'Glitter cosmético seguro', '/products/prod_50.jpg'),
('Pestañas Postizas Natural', 'Ojos', 'Negro', 80, 4500, 'Pestañas efecto natural', '/products/prod_51.jpg'),
('Pestañas Postizas Dramáticas', 'Ojos', 'Negro', 65, 5500, 'Pestañas volumen dramático', '/products/prod_52.jpg'),
('Gel de Cejas Transparente', 'Cejas', 'Transparente', 50, 6000, 'Fijador de cejas invisible', '/products/prod_53.jpg'),
('Gel de Cejas con Color', 'Cejas', 'Cafe', 45, 7500, 'Define y rellena cejas', '/products/prod_54.jpg'),
('Pomada de Cejas', 'Cejas', 'Cafe', 35, 9000, 'Pomada para cejas definidas', '/products/prod_55.jpg'),
('Lápiz Microblading', 'Cejas', 'Dorado', 40, 8500, 'Efecto pelo a pelo', '/products/prod_56.jpg'),
('Kit de Cejas', 'Cejas', 'Cafe', 25, 15000, 'Polvo, cera y pincel incluidos', '/products/prod_57.jpg'),
('Esmalte Clásico', 'Uñas', 'Rojo', 70, 4500, 'Esmalte de larga duración', '/products/prod_58.jpg'),
('Esmalte Nude', 'Uñas', 'Rosa', 65, 4500, 'Tono natural elegante', '/products/prod_59.jpg'),
('Top Coat Brillante', 'Uñas', 'Transparente', 55, 5000, 'Acabado espejo duradero', '/products/prod_60.jpg'),
('Base Fortalecedora', 'Uñas', 'Transparente', 50, 5500, 'Fortalece y protege uñas', '/products/prod_61.jpg'),
('Set de Esmaltes', 'Uñas', 'Rojo', 30, 22000, 'Colección 6 tonos tendencia', '/products/prod_62.jpg');

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

SELECT id_producto,nombre,precio,stock,imagen FROM producto WHERE nombre ILIKE '%rubor%'  LIMIT 12 OFFSET 0

SELECT * FROM cliente;
select * from producto;

select * from cliente_producto

SELECT DISTINCT color