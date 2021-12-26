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
    estado varchar(150) not null
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
    partido number not null
);

create table autogol(
    id number not null primary key,
    incidencia number not null
);

create table gol(
    id number not null primary key,
    incidencia number not null,
    jugador number not null
);

create table tirolibre(
    id number not null primary key,
    distancia number not null,
    gol number not null
);

create table penal(
    id number not null primary key,
    gol number not null,
    jugador number not null
);

create table jugada(
    id number not null primary key,
    gol number not null
);

create table competencia(
    id number not null primary key,
    nombre varchar(20) not null,
    anio number not null, 
    tipo varchar(20) not null,
    campeon number not null,
    pais number not null
);

create table tarjeta(
    id number not null primary key,
    color varchar(10) not null,
    incidencia number not null
);

ALTER TABLE autogol
    ADD CONSTRAINT autogol_incidencia_fk FOREIGN KEY (incidencia)
        REFERENCES incidencia (id);

ALTER TABLE competencia
    ADD CONSTRAINT competencia_equipo_fk FOREIGN KEY (campeon)
        REFERENCES equipo (id);

ALTER TABLE competencia
    ADD CONSTRAINT competencia_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE directort
    ADD CONSTRAINT directort_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE equipo
    ADD CONSTRAINT equipo_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE estadio
    ADD CONSTRAINT estadio_pais_fk FOREIGN KEY (pais)
        REFERENCES pais (id);

ALTER TABLE gol
    ADD CONSTRAINT gol_incidencia_fk FOREIGN KEY (incidencia)
        REFERENCES incidencia (id);

ALTER TABLE gol
    ADD CONSTRAINT gol_jugador_fk FOREIGN KEY (jugador)
        REFERENCES jugador (id);

ALTER TABLE incidencia
    ADD CONSTRAINT incidencia_jugador_fk FOREIGN KEY (jugador)
        REFERENCES jugador (id);

ALTER TABLE incidencia
    ADD CONSTRAINT incidencia_partido_fk FOREIGN KEY (partido)
        REFERENCES partido (id);

ALTER TABLE jugada
    ADD CONSTRAINT jugada_gol_fk FOREIGN KEY (gol)
        REFERENCES gol (id);

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

ALTER TABLE penal
    ADD CONSTRAINT penal_gol_fk FOREIGN KEY (gol)
        REFERENCES gol (id);

ALTER TABLE penal
    ADD CONSTRAINT penal_jugador_fk FOREIGN KEY (jugador)
        REFERENCES jugador (id);

ALTER TABLE tarjeta
    ADD CONSTRAINT tarjeta_incidencia_fk FOREIGN KEY (incidencia)
        REFERENCES incidencia (id);

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