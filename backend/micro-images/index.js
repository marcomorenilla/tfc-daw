const express = require("express");
const Minio = require("minio");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const minioClient = new Minio.Client({
  endPoint: "host.docker.internal",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
});

app.get("/", (req, res) => {
  res.send("Microservicio imágenes");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const bucketName = "users";
    const fileName = req.body.fileName || req.file.originalname;

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

app.get("/images/:fileName", async (req, res) => {
  try {
    const bucketName = "users";
    const fileName = req.params.fileName;

    const object = await minioClient.getObject(bucketName, fileName);
    res.setHeader("Content-Type", "image/jpeg");
    object.pipe(res);
  } catch (error) {
    console.error(error);
  }
});

app.get("/images", async (req, res) => {
  try {
    const bucketName = "users";

    console.log("intentando obtener imágenes");

    const stream = minioClient.listObjects(bucketName, "", true);
    const imagesArray = [];

    stream.on("data", (obj) => {
      imagesArray.push({
        name: obj.name,
        lastModified: obj.lastModified,
        size: obj.size,
        url: `https://tfc.localhost/images/${obj.name}`,
      });
    });

    stream.on("error", (err) => {
      console.error("Error al obtener imágenes de MinIO:", err);
    });

    stream.on("end", () => {
      res.json(imagesArray);
    });
  } catch (error) {
    console.error("Error en el microservicio:", error);
    res.status(500).json({ error: "Error al obtener imágenes de MinIO" });
  }
});

app.listen(port, () => {
  console.log(`Microservicio imágenes en http://localhost:${port}`);
});
