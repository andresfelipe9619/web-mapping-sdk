/* 
BASE DE DATOS CANTERA CAHIBI::PROYECTO DE GRADO

DIRECTOR : EDUARDO PEÑA

ALONSO ALOMIA 9812730
RUBEN CUERVO 9812731


*/

-- CONSULTAS


1. --Calcular cota promedio de todas las mallas del 2016
/* 
Utilizamos la funcion de agregacion AVG para q promedie las cotas de cada malla leyendo la Z de cada punto
en la tabla mallas2 la cual contiene los puntos individuales.
 y los agrupamos por fecha
*/

SELECT m2.fecha,AVG(ST_Z(m2.the_geom)) cprom
 from mallas2 m2 where m2.fecha like '"%2016"' group by m2.fecha order by cprom

2. --Calcular Volumen malla o mallas
/* 
de la tabla mallas la cual es de tipo multipoint, le sacamos el area al poligono convexo de cada malla 
y lo multiplicamos por el atributo profundidad de malla y esto nos da el volumen para una malla o mallas determinadas
en este caso consultamos el area y el volumen de todas las mallas del 2016
*/

select m.fecha, ST_Area(st_convexhull(m.the_geom)) Area,prof ,ST_Area(st_convexhull(m.the_geom))*m.prof Vol_M3
from mallas m where m.fecha like '"%may%2016"'
-------------
select m.fechae, ST_Area(st_convexhull(m.geom)) Area,prof ,ST_Area(st_convexhull(m.geom))*m.prof Vol_M3
from mallas2 m where m.fechae > '01/01/2016'

3. --consultar todas las mallas de agosto 2015
/* 
un simple select q nos muestra todas las mallas de euna determinada fecha o fechas
*/

select m.fecha, m.idm,the_geom from mallas m where m.fecha like '"%ago%2015"'

4. -- mostrar todas las bandas conectadas al clasificador 4
/* 
la tabla conexion bandas (cbandas) nos permite saber como esta interconectado todo el sistema 
con una simple consulta
*/

SELECT cb.idb banda,cb.idcl clasif from cbandas cb where cb.idcl='cl4'

5. -- cuales son las bandas de salida y su estado conectadas al clasificador 4
/* 
a un clasificador llegan varias bandasunas entran y otras salen, podemos distiguir entre las bandas de
salida mirando el punto de inicio de cada banda si se intersecta con la geometria
de un clasificador
*/

select b.nombre BandasSalida,b.estado,cla.nombre from bandas2 b,clasificadoras cla
where ST_within(ST_startpoint(b.the_geom),cla.the_geom) and cla.idcl='cla4'

6. -- cuales son las bandas de llegada y su estado conectadas al clasificadro 4
/* 
lo mismo q el punto anterior pero ahora miramos el punto final de cada banda
*/

select b.nombre Bandasllegada,b.estado,cla.nombre from bandas2 b,clasificadoras cla
where ST_intersects(ST_endpoint(b.the_geom),cla.the_geom) and cla.idcl='cla4'

7. -- con q productos se hace el asfalto tipo B y sus porcentajes
/* 
los productos finales y los crudos estan relacionados a travez de la tabla mezclas 
esta tabla nos dice con q materiales esta echo un producto final 
hay q hacer un joint para obtener el nombre y los demas atributos de productos crudos.
*/

select mz.idpc, pc.nombre, mz.cantidadpc "cant%" from  mezclas mz 
join productocrudo pc on mz.idpc=pc.idpc
where mz.idpf='asfb'


--8 .ruta desde la trituradora 1 hasta producto crudo grava 3/8
/* 
la triturador 1 es la puerta de entrada al sistema de produccion
solo hay un camino para llegar a un producto crudo pero para q el sig
lo identifiq la manera mas facil es usar un algoritmo de ruteo.
en este caso el algoritmo nos da las bandas q se interconectan para
llegar a un punto especifico
*/

select sub1.edge as bandaN from
 (SELECT seq, id1 AS node, id2 AS edge, cost FROM pgr_dijkstra('
                SELECT gid AS id,
                         source::integer,
                         target::integer,
                         reverse_cost::double precision AS cost
                        FROM bandas2',
                8,2, false, false)) as sub1



--9.tiempo de recorrido en las bandas desde  trituradora1 hasta grava 3/8
/* 
el ruteo nos identifica las bandas ademas nos da una columna cost
en este caso le decimos al algoritmo q en costo haga un campo calculado
q es el inverso de la velocidad por la distacia lo cual nos da el tiempo de recorrido
de la ruta especifica. usamos el algoritmo de ruteo como una subconsulta
*/

select sum(sub1.cost) "tiempo(s)" from
 (SELECT seq, id1 AS node, id2 AS edge, cost FROM pgr_dijkstra('
                SELECT gid AS id,
                         source::integer,
                         target::integer,
                         1/velocidad*reverse_cost::double precision AS cost                  
                        FROM bandas2',
                8,2, false, false)) as sub1; 


-- 10. cuales es la capacidad de los clasificadores q intervienen en el proceso de la grava 34 
/* 
otra ves usamos el ruteo para determinar las bandas y las maquinas q intervienen en el proceso
hacemos una doble subconsulta anidada  en la primera hacemos un joint para extraer la
gemoetria de las bandas y la segunda para hacer la interseccion con las clasificadoras
y asi saber cuales son las clasificadroas q intervienen en esa ruta.

*/

select distinct cla.nombre, cla.capacidad from clasificadoras cla,
(select bd2.the_geom from 
(SELECT  id2 AS idb FROM pgr_dijkstra('
                SELECT gid AS id,
                         source::integer,
                         target::integer,
                         reverse_cost::double precision AS cost
                         FROM bandas2',
                8,19, false, false)) as  sub1 join bandas2 bd2 on sub1.idb=bd2.gid) sub2
where ST_intersects(cla.the_geom,sub2.the_geom)
                
