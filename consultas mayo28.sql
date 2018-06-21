-- CONSULTAS

1 --los despachos a el cliente 52 del producto asfa

SELECT D.iddes, D.cliente, D.idpc, PC.nombre, D.cantidadpc 
from despachos D INNER JOIN procrudo PC
ON D.idpc= PC.idpc WHERE D.idcli='52' AND D.idpc='g38'

2 -- la cantidad total de producto final comprado por un cliente
SELECT D.cliente, PC.nombre, SUM(CAST(D.cantidadpc AS Integer)) AS volumen
from despachos D INNER JOIN procrudo PC
ON D.idpc = PC.idpc WHERE D.idcli='51' AND D.idpc='pp2'
GROUP BY  D.cliente, PC.nombre

3 -- Calcular cota promedio de todas las mallas
SELECT  AVG (M.cota) as cota_promedio
 from mallas M 

4 -- Mallas de origen del producto PP2 vendido al cliente 51
SELECT D.cliente, D.iddes, PC.idpc, PC.nombre, M.idmal, M.idt, T.id_clasif 
from mallas M
INNER JOIN trituradoras T
ON M.idt = T.idt
INNER JOIN clasificadoras C
ON T.id_clasif = C.id_clasif
INNER JOIN procrudo PC
ON C.id_clasif= PC.id_clasif
INNER JOIN despachos D 
ON PC.idpc= D.idpc
WHERE D.idcli='51' AND PC.idpc ='pp2'

5 -- Mallas de origen del producto PP2 vendido al cliente 51 del despacho 86
SELECT D.cliente, D.iddes, PC.idpc, PC.nombre, M.idmal, M.idt, T.id_clasif 
from mallas M
INNER JOIN trituradoras T
ON M.idt = T.idt
INNER JOIN clasificadoras C
ON T.id_clasif = C.id_clasif
INNER JOIN procrudo PC
ON C.id_clasif= PC.id_clasif
INNER JOIN despachos D 
ON PC.idpc= D.idpc
WHERE D.idcli='51' AND PC.idpc ='pp2' AND D.iddes ='86'

5 -- Calificacion dada por ell cliente 51 del despacho 86

SELECT D.iddes, D.cliente, PC.nombre, D.califica
from despachos D
INNER JOIN procrudo PC
ON PC.idpc= D.idpc
WHERE D.iddes ='86'

6 -- Zona a la que pertenece las Mallas de origen
--del producto PP2 vendido al cliente 51 del despacho 86
SELECT D.iddes, D.cliente, PC.nombre, M.idmal, M.idzona
from mallas M
INNER JOIN trituradoras T
ON M.idt = T.idt
INNER JOIN clasificadoras C
ON T.id_clasif = C.id_clasif
INNER JOIN procrudo PC
ON C.id_clasif= PC.id_clasif
INNER JOIN despachos D 
ON PC.idpc= D.idpc
WHERE D.idcli='51' AND PC.idpc ='pp2' AND D.iddes ='86'