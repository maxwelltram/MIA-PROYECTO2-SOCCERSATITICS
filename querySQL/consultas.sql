SELECT * FROM usuarios;

--jugador x edad

SELECT * FROM jugador where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY');

--director x edad

SELECT * FROM directort where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY')

--equipo x competicion

SELECT * FROM equipo inner join competencia on nombre= '"+nombre+"' inner join competidor on equipo.id=competidor.equipo and competencia.id=competidor.competencia

--equipo x pais

SELECT * FROM equipo inner join pais on pais.nombre= '"+nombre+"' and pais.id=equipo.pais


--estadio x antiguedad

SELECT * FROM estadio where fecha_inauguracion BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') 

--estadio x pais 

SELECT * FROM estadio inner join pais on pais.nombre= '"+nombre+"' and pais.id=estadio.pais


--partido x equipo

SELECT * FROM partido inner join equipo on equipo.nombres= '"+nombre+"' and (equipo.id=partido.visita or equipo.id=partido.local)

--jugador estuvo x equipo

SELECT * FROM jugador inner join equipo on nombres= '"+nombre+"' inner join participante on jugador.id=participante.jugador and equipo.id=participante.equipo

--director estuvo x equipo

SELECT * FROM directort inner join equipo on nombres= '"+nombre+"' inner join direccion on directort.id=direccion.directort and equipo.id=direccion.equipo and equipo.id=direccion.equipo

--jugador x equipo

SELECT * FROM jugador inner join equipo on nombres= '"+nombre+"' inner join participante on jugador.id=participante.jugador and equipo.id=participante.equipo and participante.fecha_fin= null

--director x equipo

SELECT * FROM directort inner join equipo on nombres= '"+nombre+"' inner join direccion on directort.id=direccion.directort and equipo.id=direccion.equipo