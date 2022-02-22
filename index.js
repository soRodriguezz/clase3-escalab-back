// Importacion de librerias
const express = require("express");
const bodyparser = require("body-parser");

const jsonParser = bodyparser.json();
const cors = require("cors");

let usuario = {
  nombre: "",
  apellido: "",
};

let respuesta = {
  error: false,
  codigo: 200,
  mensaje: "",
};

let items = [
  {
    name: "Super Mario Kart",
    description: "Juego de aventuras",
    platform: "Nintendo",
    img: "./assets/images/mariokart.jpg",
  },
  {
    name: "Gran turismo",
    description: "Juego de carreras",
    platform: "PlayStation",
    img: "./assets/images/gt.jpg",
  },
  {
    name: "GTA",
    description: "Juego de aventuras",
    platform: "Todas las plataformas",
    img: "./assets/images/gta.jpg",
  },
  {
    name: "Mortal Kombat",
    description: "Juego de peleas",
    platform: "Todas las plataformas",
    img: "./assets/images/mk.jpg",
  },
  {
    name: "Pokemon",
    description: "Juego de estrategia y aventura",
    platform: "Nintendo Switch",
    img: "./assets/images/pokemon.jpg",
  },
];

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/products", function (req, res) {
  console.log("Consultando products");
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: items,
  };
  res.send(respuesta);
});

app.get("/product/:id", jsonParser, function (req, res) {
  let id = req.params.id;
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: items[id],
  };
  res.send(respuesta);
});

app.post("/product", jsonParser, function (req, res) {
  console.log(req.body);
  if (!req.body) {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: "Error creando el nuevo Juego",
    };
  } else {
    items.push(req.body);
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: items,
    };
  }
  res.send(respuesta);
});

app.put("/product/:id", jsonParser, function (req, res) {
  let id = req.params.id;
  items[id].name = req.body.name;
  items[id].description = req.body.description;
  items[id].platform = req.body.platform;
  items[id].img = req.body.img;
  console.log(items[id]);
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: items[id],
  };
  res.send(respuesta);
});

app.delete("/product/:id", jsonParser, function (req, res) {
    const id = req.params.id;
    items.splice(id, 1);
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: items,
    };
    res.send(respuesta);
});

app.get("/", function (req, res) {
  respuesta = {
    error: true,
    codigo: 200,
    mensaje: "Inicio",
  };
  res.send(respuesta);
});

app.get("/usuario", function (req, res) {
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: "",
  };
  if (usuario.nombre === "" || usuario.apellido === "") {
    respuesta = {
      error: true,
      codigo: 500,
      mensaje: "El usuario no existe",
    };
  } else {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: usuario,
    };
  }
  res.send(respuesta);
});

app.post("/usuario", jsonParser, function (req, res) {
  //    console.log(req.body)
  if (!req.body.nombre || !req.body.apellido) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre y apellido son requeridos",
    };
  } else {
    if (usuario.nombre !== "" || usuario.apellido !== "") {
      respuesta = {
        error: true,
        codigo: 503,
        mensaje: "El usuario ya fue creado previamente",
      };
    } else {
      usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
      };
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Usuario creado",
        respuesta: usuario,
      };
    }
  }
  res.send(respuesta);
});

app.put("/usuario", jsonParser, function (req, res) {
  if (!req.body.nombre || !req.body.apellido) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre y apellido son requeridos",
    };
  } else {
    if (usuario.nombre === "" || usuario.apellido === "") {
      respuesta = {
        error: true,
        codigo: 502,
        mensaje: "El usuario no ha sido creado",
      };
    } else {
      usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
      };
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Usuario actualizado",
        respuesta: usuario,
      };
    }
    res.send(respuesta);
  }
});

app.delete("/usuario", jsonParser, function (req, res) {
  if (usuario.nombre === "" || usuario.apellido === "") {
    respuesta = {
      error: true,
      codigo: 501,
      mensaje: "El usuario no ha sido creado",
    };
  } else {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: "Usuario eliminado",
    };
    usuario = {
      nombre: "",
      apellido: "",
    };
  }
  res.send(respuesta);
});

app.listen(3001, () => {
  console.log("api up");
});
