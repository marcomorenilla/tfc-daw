const express = require("express");
const Minio = require("minio");
const multer = require("multer");

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const minioClient = new Minio.Client({
  endPoint: "minio-storage",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const bucketName = "usuarios";
    const fileName = `${Date.now()}-${req.file.originalname}`;

    await minioClient.putObject(
      bucketName,
      fileName,
      req.file.buffer,
      req.file.size,
    );

    res.json({
      message: "Subida con éxito",
      url: `http://localhost/images/${fileName}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir a MinIO" });
  }
});

app.listen(port, () => {
  console.log(`Microservicio de media escuchando en http://localhost:${port}`);
});
