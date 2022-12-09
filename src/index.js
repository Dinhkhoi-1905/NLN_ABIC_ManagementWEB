const path = require('path')
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const methodOverride = require('method-override')

const cookieSession = require("cookie-session");
const dbConfig = require("./config/db.config");
const port = 3000;
const url = require('url');
const route = require('./routes');
// const db = require('./config/db');
//Connect DB
// db.connect();

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
//---HTTP logger
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
//--Chỉnh đường dẫn vào thư mục views
app.set('views', path.join(__dirname, 'resources', 'views'));

//-------Use MiddleWare----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// override method to use PUT
app.use(methodOverride('_method'));
app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

route(app);
const db = require("./app/models");
const Role = db.role;
//Tạo thêm công cụ
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    }
  }),
);
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      formattedDate: (date) => {
        if (date != undefined) return date.toLocaleDateString('en-GB', { timeZone: 'UTC' });
        else return date;
      },
      getMonth: (date) => {
        if (date != undefined) return date.getMonth();
        else return date;
      },
      getCurrMonth: () => {
        var today = new Date();
        // return (today.getIOSMonth() + 1);
        return  today.getMonth();
      },
      compareMonth: (date) =>{
          var month = date.getMonth();
          var cur = new Date();
          if (month != undefined) return month == cur.getMonth();
      }
      ,
      conversedDate: (date) => {
        // var dateFormat = date.toLocaleDateString();
        
        if (date != undefined) return date.toISOString().split('T')[0];

        else return date;
      },

      equal: (a, b) => a == b,
      
      equalString: (a, b) => a === b,
      times: function (n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i) {
          block.data.index = i;
          block.data.first = i === 0;
          block.data.last = i === (n - 1);
          accum += block.fn(this);
        }
        return accum;
      },
      sum: (a, b) => a + b,
      or: () => '||',
      equalOr: (a, b, c) => a == b || a == c,
      appendUrl: function (param) {
        var url = window.location.href;
        if (url.indexOf('?') > -1) {
          url += '&'+param;
        } else {
          url += '?'+param;
        }
        window.location.href = url;
      },

      url: function(){
        var urlParse = url.parse('http://localhost:3000/nhanvien/listt?page=1',true);
        return urlParse.search;
      }

    }
  }),
);
// app.engine(
//   'hbs',
//   handlebars.engine({
//     extname: '.hbs',
//     helpers: {
//       equal: (a, b) => a==b,
//     }
//   }),
// );

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}