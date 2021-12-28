CREATE SEQUENCE TEST_ID_SEQ
INCREMENT BY 1
START WITH 1
MAXVALUE 999999999
NOCYCLE
NOCACHE;

create table usuarios(
    id number Not null primary key,
    nombres varchar(50) not null,
    apellidos varchar(50) not null,
    clave varchar(50) not null,
    correo varchar(50) not null,
    telefono number not null,
    foto varchar(50) not null,
    genero number not null,
    fecha_nacimiento date not null,
    fecha_registro date not null,
    direccion varchar(50) not null,
    pais number not null,
    tipo number not null
);

create table tipousuario(
    id number not null primary key,
    tipo varchar(15) not null
);

create table pais(
    id number not null primary key,
    nombre varchar(20)
);

create table genero(
    id number not null primary key,
    nombre varchar(20)
);

create table posicion(
    id number not null primary key,
    nombre varchar(20)
);

create table suscripcion(
    id number Not null primary key,
    detalle varchar(75) not null,   
    costo number not null,
    equipo number not null,
    usuario number not null
);


create table publicacion(
    id number Not null primary key,
    usuario number not null,
    noticia number not null
);

create table publicacion(
    id number Not null primary key,
    titulo varchar(30) not null,
    detalle varchar(300) not null
);


create table directort(
    id number Not null primary key,
    nombres_apellidos varchar(50) not null,   
    fecha_nacimiento date not null,
    pais number not null,
    estado varchar(150) not null,
    foto varchar(50) null
);

create table estadio(
    id number Not null primary key,
    nombres varchar(50) not null,   
    fecha_inauguracion date not null,
    capacidad number not null,
    pais number not null,
    direccion varchar(150) not null,
    estado varchar(150) not null
);


create table jugador(
    id number Not null primary key,
    nombres_apellidos varchar(50) not null,   
    fecha_nacimiento date not null,
    pais number not null,
    posicion number not null,
    estado varchar(150) null
);

create table equipo(
    id number Not null primary key,
    nombres varchar(50) not null,   
    fecha_fundacion date not null,
    pais number not null,
    foto varchar(50) null
);


create table partido(
    id number not null primary key,
    fecha date not null,
    estadio number not null,
    asistenia number not null,
    visita number not null,
    local number not null,
    resultado varchar(150) not null,
    estado varchar(150) not null
);

create table participante(
    id number not null primary key,
    jugador number not null,
    equipo number not null,
    fecha_in date not null,
    fecha_fin date null
);

create table direccion(
    id number not null primary key,
    directort number not null,
    equipo number not null,
    fecha_in date not null,
    fecha_fin date null
);

create table incidencia(
    id number not null primary key,
    jugador number not null,
    minuto number not null,    
    partido number not null,
    equipo number not null,
    detalle varchar(250) not null
);




create table competencia(
    id number not null primary key,
    nombre varchar(20) not null,
    anio number not null, 
    tipocompetencia number not null,
    campeon number  null,
    pais number not null
);

create table competidor(
    id number not null primary key,
    equipo number not null,
    competencia number not null, 
);

create table tipocompetencia(
    id number not null primary key,
    nombre varchar(10) not null
);






ALTER TABLE competencia
    ADD CONSTRAINT competencia_campeon_fk FOREIGN KEY (campeon)
        REFERENCES equipo (id);

ALTER TABLE competencia
    ADD CONSTRAINT competencia_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE competencia
    ADD CONSTRAINT competencia_tipocompetencia_fk FOREIGN KEY (tipocompetencia)
        REFERENCES tipocompetencia ( id );

ALTER TABLE competidor
    ADD CONSTRAINT competidor_competencia_fk FOREIGN KEY (competencia)
        REFERENCES competencia ( id );

ALTER TABLE competidor
    ADD CONSTRAINT competidor_equipo_fk FOREIGN KEY (equipo)
        REFERENCES equipo ( id );


ALTER TABLE directort
    ADD CONSTRAINT directort_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE equipo
    ADD CONSTRAINT equipo_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE estadio
    ADD CONSTRAINT estadio_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);



ALTER TABLE incidencia
    ADD CONSTRAINT incidencia_jugador_fk FOREIGN KEY (jugador)
        REFERENCES jugador (id);

ALTER TABLE incidencia
    ADD CONSTRAINT incidencia_equipo_fk FOREIGN KEY (equipo)
        REFERENCES equipo (id);

ALTER TABLE incidencia
    ADD CONSTRAINT incidencia_partido_fk FOREIGN KEY (partido)
        REFERENCES partido (id);


ALTER TABLE jugador
    ADD CONSTRAINT jugador_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE jugador
    ADD CONSTRAINT jugador_posicion_fk FOREIGN KEY (posicion)
        REFERENCES posicion (id);

ALTER TABLE participante
    ADD CONSTRAINT participante_equipo_fk FOREIGN KEY (equipo)
        REFERENCES equipo (id);

ALTER TABLE participante
    ADD CONSTRAINT participante_jugador_fk FOREIGN KEY (jugador)
        REFERENCES jugador (id);

ALTER TABLE partido
    ADD CONSTRAINT partido_equipo_fk FOREIGN KEY (equipo)
        REFERENCES equipo (id);

ALTER TABLE partido
    ADD CONSTRAINT partido_equipo_fkv2 FOREIGN KEY (equipo1)
        REFERENCES equipo (id);

ALTER TABLE partido
    ADD CONSTRAINT partido_estadio_fk FOREIGN KEY (estadio)
        REFERENCES estadio (id);


ALTER TABLE tirolibre
    ADD CONSTRAINT tirolibre_gol_fk FOREIGN KEY (gol)
        REFERENCES gol (id);

ALTER TABLE usuarios
    ADD CONSTRAINT usuario_genero_fk FOREIGN KEY (genero)
        REFERENCES genero (id);

ALTER TABLE usuarios
    ADD CONSTRAINT usuario_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE usuarios
    ADD CONSTRAINT usuario_tipousuario_fk FOREIGN KEY (tipo)
        REFERENCES tipousuario (id);

ALTER TABLE direccion
    ADD CONSTRAINT direccion_directort_fk FOREIGN KEY (directort)
        REFERENCES directort ( id );

ALTER TABLE direccion
    ADD CONSTRAINT direccion_equipo_fk FOREIGN KEY (equipo)
        REFERENCES equipo ( id );


ALTER TABLE publicacion
    ADD CONSTRAINT publicacion_noticia_fk FOREIGN KEY ( noticia )
        REFERENCES noticia ( id );

ALTER TABLE publicacion
    ADD CONSTRAINT publicacion_usuario_fk FOREIGN KEY ( usuario )
        REFERENCES usuarios ( id );

ALTER TABLE suscripcion
    ADD CONSTRAINT suscripcion_equipo_fk FOREIGN KEY ( equipo )
        REFERENCES equipo ( id );

ALTER TABLE suscripcion
    ADD CONSTRAINT suscripcion_usuario_fk FOREIGN KEY ( usuario )
        REFERENCES usuarios ( id );