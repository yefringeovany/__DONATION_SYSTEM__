-- Tabla de Usuarios
CREATE TABLE Usuarios (
    UsuarioID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(255),
	Apellido VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    PasswordHash VARCHAR(255),
    Rol VARCHAR(50) CHECK (Rol IN ('Empleado', 'Donador')),
    Activo BIT,
    Token VARCHAR(255),
    UltimoEmailEnviado DATE
);

-- Tabla de Donaciones
CREATE TABLE Donaciones(
    DonacionID INT IDENTITY(1,1) PRIMARY KEY,
    DonanteID INT, -- Clave foránea a Usuarios
    EmpleadoID INT, -- Clave foránea a Usuarios
    ProyectoID INT, -- Nueva clave foránea a Proyectos
    FechaDonacion DATETIME,
    Monto DECIMAL(10, 2),
    BoletaDeposito VARCHAR(255),
    Estado VARCHAR(50),
    FOREIGN KEY (DonanteID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (EmpleadoID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (ProyectoID) REFERENCES Proyectos(ProyectoID)
);

-- Tabla de Proyectos
CREATE TABLE Proyectos (
    ProyectoID INT IDENTITY(1,1) PRIMARY KEY,
	NombreProyecto VARCHAR(255),
	DescripcionProyecto VARCHAR(255),
    EmpleadoID INT,
    NombreEmpleado VARCHAR(255),
	ApellidoEmpleado VARCHAR(255),
	MetaTotal MONEY,
    EstadoProyecto VARCHAR(50),
	DocumentoSoporte VARBINARY(MAX)
    FOREIGN KEY (EmpleadoID) REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Documentos de Soporte
CREATE TABLE DocumentosSoporte (
    DocumentoID INT IDENTITY(1,1) PRIMARY KEY,
    DonacionID INT, -- Clave foránea a Donaciones
    ProyectoID INT, -- Clave foránea a Proyectos
    TipoDocumento VARCHAR(50),
    FOREIGN KEY (DonacionID) REFERENCES Donaciones(DonacionID),
    FOREIGN KEY (ProyectoID) REFERENCES Proyectos(ProyectoID)
);

-- Tabla de Dashboard de Donaciones
CREATE TABLE DashboardDonaciones (
    EmpleadoID INT IDENTITY(1,1) PRIMARY KEY,
    DonacionEntrante DECIMAL(10, 2),
    FOREIGN KEY (EmpleadoID) REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Notificaciones por Correo Electrónico
CREATE TABLE Notificaciones (
    NotificacionID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT, -- Clave foránea a Usuarios
    EventoImportante VARCHAR(255),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
);

