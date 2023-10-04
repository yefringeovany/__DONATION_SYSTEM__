-- Tabla de Usuarios
CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    PasswordHash VARCHAR(255),
    Rol VARCHAR(50) CHECK (Rol IN ('Empleado', 'Donador')),
    Activo BIT
);

-- Tabla de Donaciones
CREATE TABLE Donaciones (
    DonacionID INT PRIMARY KEY,
    DonanteID INT, -- Clave foránea a Usuarios
    EmpleadoID INT, -- Clave foránea a Usuarios
    FechaDonacion DATETIME,
    Monto DECIMAL(10, 2),
    BoletaDeposito VARCHAR(255),
    Estado VARCHAR(50),
    FOREIGN KEY (DonanteID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (EmpleadoID) REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Proyectos
CREATE TABLE Proyectos (
    ProyectoID INT PRIMARY KEY,
    EmpleadoID INT, -- Clave foránea a Usuarios
    Nombre VARCHAR(255),
    EstadoProyecto VARCHAR(50),
    FOREIGN KEY (EmpleadoID) REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Documentos de Soporte
CREATE TABLE DocumentosSoporte (
    DocumentoID INT PRIMARY KEY,
    DonacionID INT, -- Clave foránea a Donaciones
    ProyectoID INT, -- Clave foránea a Proyectos
    TipoDocumento VARCHAR(50),
    FOREIGN KEY (DonacionID) REFERENCES Donaciones(DonacionID),
    FOREIGN KEY (ProyectoID) REFERENCES Proyectos(ProyectoID)
);

-- Tabla de Dashboard de Donaciones
CREATE TABLE DashboardDonaciones (
    EmpleadoID INT PRIMARY KEY,
    DonacionEntrante DECIMAL(10, 2),
    FOREIGN KEY (EmpleadoID) REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Notificaciones por Correo Electrónico
CREATE TABLE Notificaciones (
    NotificacionID INT PRIMARY KEY,
    UsuarioID INT, -- Clave foránea a Usuarios
    EventoImportante VARCHAR(255),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

SELECT * FROM DashboardDonaciones
SELECT * FROM DocumentosSoporte
SELECT * FROM Donaciones
SELECT * FROM Notificaciones
SELECT * FROM Proyectos
SELECT * FROM Usuarios