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
('Primer Facial', 'Rostro', 'Transparente', 22, 16500, 'Primer hidratante para preparar la piel', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400')
('Labial Líquido Mate', 'Labios', 'Borgoña', 45, 9500, 'Labial líquido de larga duración 24hrs', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'),
('Labial Cremoso', 'Labios', 'Coral', 38, 7800, 'Labial hidratante con vitamina E', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'),
('Delineador de Labios', 'Labios', 'Nude', 60, 4500, 'Lápiz delineador cremoso para contorno', 'https://images.unsplash.com/photo-1599948128020-9a44505b0d1b?w=400'),
('Labial Metálico', 'Labios', 'Fucsia', 30, 10500, 'Acabado metálico brillante', 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400'),
('Bálsamo Labial con Color', 'Labios', 'Rosa Suave', 70, 5500, 'Hidratación con toque de color', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'),
('Labial Satinado', 'Labios', 'Terracota', 42, 8800, 'Acabado satinado elegante', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400'),
('Tinta de Labios', 'Labios', 'Cereza', 55, 7200, 'Efecto natural de larga duración', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'),
('Labial Nude', 'Labios', 'Beige Rosado', 48, 8200, 'Tono natural para uso diario', 'https://images.unsplash.com/photo-1599948128020-9a44505b0d1b?w=400'),
('Set de Mini Labiales', 'Labios', 'Multicolor', 25, 18500, 'Set de 5 tonos variados', 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400'),
('Labial Plumper', 'Labios', 'Rosa Intenso', 35, 11000, 'Efecto voluminizador instantáneo', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'),
('Base Matte Full Coverage', 'Rostro', 'Porcelana', 28, 22000, 'Cobertura total acabado mate', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400'),
('Base Luminosa', 'Rostro', 'Arena', 32, 19500, 'Acabado luminoso natural', 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400'),
('BB Cream', 'Rostro', 'Light', 50, 14000, 'Hidratación y cobertura ligera SPF30', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400'),
('CC Cream', 'Rostro', 'Medium', 45, 15500, 'Corrector de color con protección solar', 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400'),
('Contorno en Crema', 'Rostro', 'Bronce', 38, 12500, 'Contorno cremoso fácil de difuminar', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'),
('Contorno en Polvo', 'Rostro', 'Marrón', 40, 11000, 'Contorno en polvo natural', 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400'),
('Bronzer', 'Rostro', 'Sun Kissed', 35, 13500, 'Bronceador para efecto verano', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400'),
('Iluminador Líquido', 'Rostro', 'Champagne', 42, 14500, 'Iluminador fluido multiusos', 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400'),
('Iluminador en Stick', 'Rostro', 'Perla', 30, 12000, 'Aplicación precisa y fácil', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'),
('Rubor Líquido', 'Rostro', 'Melocotón', 48, 9800, 'Acabado natural y fresco', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400'),
('Rubor en Crema', 'Rostro', 'Berry', 36, 10200, 'Textura cremosa buildable', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'),
('Setting Spray', 'Rostro', 'Transparente', 55, 16000, 'Fijador de maquillaje 16hrs', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400'),
('Polvo Suelto', 'Rostro', 'Translúcido', 40, 14000, 'Polvo fijador ultrafino', 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400'),
('Primer Poros', 'Rostro', 'Transparente', 33, 18000, 'Minimiza poros y líneas finas', 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400'),
('Primer Iluminador', 'Rostro', 'Rosa', 28, 17500, 'Base luminosa con partículas', 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400'),
('Paleta Sombras Nude', 'Ojos', 'Nude', 25, 28000, 'Paleta 18 tonos nude esenciales', 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400'),
('Paleta Sombras Coloridas', 'Ojos', 'Rainbow', 20, 32000, 'Paleta 24 tonos vibrantes', 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400'),
('Sombra Individual Shimmer', 'Ojos', 'Oro', 50, 6500, 'Sombra con brillo intenso', 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400'),
('Sombra Individual Mate', 'Ojos', 'Marrón', 55, 6000, 'Sombra mate altamente pigmentada', 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400'),
('Delineador en Gel', 'Ojos', 'Negro', 45, 8500, 'Delineador waterproof larga duración', 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400'),
('Delineador Colorido', 'Ojos', 'Azul', 35, 7500, 'Delineador líquido color intenso', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'),
('Lápiz Kajal', 'Ojos', 'Negro Intenso', 60, 5500, 'Lápiz suave para línea de agua', 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400'),
('Máscara Volumen Extremo', 'Ojos', 'Negro', 40, 14500, 'Volumen dramático sin grumos', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'),
('Máscara Alargadora', 'Ojos', 'Negro', 42, 13000, 'Efecto pestañas XXL', 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400'),
('Máscara Waterproof', 'Ojos', 'Negro', 38, 15000, 'Resistente al agua y sudor', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'),
('Máscara de Color', 'Ojos', 'Azul', 25, 11500, 'Máscara colorida para looks creativos', 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400'),
('Primer de Ojos', 'Ojos', 'Nude', 35, 10000, 'Base para sombras larga duración', 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400'),
('Glitter para Ojos', 'Ojos', 'Plata', 30, 7000, 'Glitter cosmético seguro', 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400'),
('Pestañas Postizas Natural', 'Ojos', 'Negro', 80, 4500, 'Pestañas efecto natural', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'),
('Pestañas Postizas Dramáticas', 'Ojos', 'Negro', 65, 5500, 'Pestañas volumen dramático', 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400'),
('Gel de Cejas Transparente', 'Cejas', 'Transparente', 50, 6000, 'Fijador de cejas invisible', 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=400'),
('Gel de Cejas con Color', 'Cejas', 'Castaño Oscuro', 45, 7500, 'Define y rellena cejas', 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=400'),
('Pomada de Cejas', 'Cejas', 'Marrón Medio', 35, 9000, 'Pomada para cejas definidas', 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=400'),
('Lápiz Microblading', 'Cejas', 'Rubio', 40, 8500, 'Efecto pelo a pelo', 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=400'),
('Kit de Cejas', 'Cejas', 'Universal', 25, 15000, 'Polvo, cera y pincel incluidos', 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=400'),
('Esmalte Clásico', 'Uñas', 'Rojo', 70, 4500, 'Esmalte de larga duración', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'),
('Esmalte Nude', 'Uñas', 'Rosa Pálido', 65, 4500, 'Tono natural elegante', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'),
('Top Coat Brillante', 'Uñas', 'Transparente', 55, 5000, 'Acabado espejo duradero', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'),
('Base Fortalecedora', 'Uñas', 'Transparente', 50, 5500, 'Fortalece y protege uñas', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'),
('Set de Esmaltes', 'Uñas', 'Multicolor', 30, 22000, 'Colección 6 tonos tendencia', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400');


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