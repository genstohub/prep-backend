const db = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false,
      ca: `-----BEGIN CERTIFICATE-----
          MIIEUDCCArigAwIBAgIUVazXwgrTxn7Vjz4QZfWhvgnZXNowDQYJKoZIhvcNAQEM
          BQAwQDE+MDwGA1UEAww1Njg2MmE1NjUtNWFlNS00MTkzLWFlYTgtYjljNGU5NDFj
          MDM4IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUxMjExMjMyOTI2WhcNMzUxMjA5MjMy
          OTI2WjBAMT4wPAYDVQQDDDU2ODYyYTU2NS01YWU1LTQxOTMtYWVhOC1iOWM0ZTk0
          MWMwMzggR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
          AYoCggGBAMxq6gED6VeNbi0jxb4W0DIFOE9WzOA1rytKju4yf8jbtXocNJLHUKzC
          VrPVOFwj1HCmLy9z0q/2nNBkD7+VFIlStHH47K67Dy2dtM6zX+XVWDtskmWUdXJe
          SitVeabrWHLsBxDg9NAT0RIrHos+WOnLISbafwDWzBtRUsy2mysIDW/OXO5OhlW/
          GPl4EqHnVaEaMV5sOKJAaxd1hF+UKwltFNx+lym043O8jvnXKlmLV09A/qdLChgx
          FJK2wyk3ejMzrayfercUlxoCNk35rsTT4SMU1oUapF1nzxnrMrVjBE3bO+baNhuR
          vsQTUE3ADiqMFHUGYSfw50HXtHfifJO0iT0qJHUmDdTZ481LYh3gVF6PI4YbKcW7
          j8t89gRlP+Ysjf+Y9PRDgMc7PDYbKCqCT+bP9h0ZNPgMQz3Ho+YyBnbTE40vaj7G
          Rh70YVniehV7RTMzItaCCIwRc6EcYYG4ZaB0AwiwYh1IB4gPuI8RXkZywDLd2NKY
          sRXAlORblQIDAQABo0IwQDAdBgNVHQ4EFgQUJgvjuBmWvjxZjtDNhnMeJAEHrTcw
          EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
          ggGBALlgcSwrDnW51mLPtv8m/Y7U3DhOlFAnQZK/wLWNlM4DcPM/feYI41Dretmd
          /9VlWVkzOzLvDnu/aJeS0WAyDdtMwrhNtJfBAF+5EkrStiIlRyV5m/AgQ4I1X+9e
          39gfyz12U6J5gyuM3Zvbp3E7FfxNYrkmVkxGXIh4mNdqcZUkvrnvAKgq0ONkn1TN
          3IGZnyPeOZNcND62F7iyt4pXYMxYTJhWAo2Hq86XYwuCplJHVxqQ/nlfvT2M9ej4
          Kf3LxGknJ1l12hl4I+xrg8MjElOSM7YviOdAKYWHZIUBkqidPux9w+ZyxuDUXQKP
          XgjYhhzrI1x/7cpYq6a0z4XhokZlGBXC9vIFUoPrft1e8Lal/TC6YpXuT6WJ10xk
          fvzicua4EZRY4yWI92y74gVNASJkNf4oSedngRp8QiLSlgpdQHFXd+JnUfW+y7Ou
          W7CHj0RD8lbpm43rBirYazCHb2zdP7ZiOszdrVcfRWazYsu2paLBEomCHmqCWKDH
          MDHeaA==
          -----END CERTIFICATE-----`,
    },
  },
});

module.exports = db;

// const db = knex({
//     // connect to your own database here:
//     client: process.env.CLIENT,
//     // connection: {
//     //   connectionString: process.env.DATABASE_URL,
//       host : process.env.HOST,
//       user : process.env.USER,
//       port: process.env.PORT,
//       password : process.env.PASSWORD,
//       database : process.env.DATA_BASE,
//       ssl: {
//         rejectUnauthorized: false,
//         ca: `-----BEGIN CERTIFICATE-----
//             MIIEUDCCArigAwIBAgIUYtsElJ5XI/F1qQS3ea1lUdyCREgwDQYJKoZIhvcNAQEM
//             BQAwQDE+MDwGA1UEAww1ZWU1NjVjNWUtNzNlZi00MWE2LTk3ZDctNGUyYzJkOTg2
//             ODNiIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUxMTE0MTQzMjAyWhcNMzUxMTEyMTQz
//             MjAyWjBAMT4wPAYDVQQDDDVlZTU2NWM1ZS03M2VmLTQxYTYtOTdkNy00ZTJjMmQ5
//             ODY4M2IgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
//             AYoCggGBANa0SemmrGoCwQk7lCqgl/ddspvxKDi833n1Ank9GWkEnE0NqFWtgRCt
//             L9r8VwRURsUsjUtTTr7epigTr4GLvL+6fIQegdBFYJzA9P1PnMKMLWzYVtBH61gF
//             Vn0KI+iSdDh0dSvnvw3SksIbLVF3faEGOefMPgFviAHdsK1tUANAfa4xQHEZRWgS
//             7U8oTaUqarFc0vgqMsm/I6t1ZpkOBdejtyAipqz1tws4RBwFsh1flbY6Q73jw50L
//             4TQY2Ehx7Fye0Jn7txiSfLh1oupn/jJk9H4XPUpxewI9tn5e5pRLgxgVhTGKtXvq
//             baAfKQ8FQrZ4D+p/eT3gmuZPzBBZpnGnYrprizj5O6CqjBIyesNsRF5Cw4yfvf5b
//             1mNe5O/42jdEjGsK8ZoH28OUdR33RcyTfjAPfOU6MYlgmawTEeerCYt191UiREx8
//             UUYIkYb0ggqFxtRhLGZK4rxXnX6WlVlMP3+ICpJnULdNabWJIKkp0egL2jYn8eVy
//             wscP5QQ9RQIDAQABo0IwQDAdBgNVHQ4EFgQUE4gRuy+/KFszXkv/zM4DVRc72BEw
//             EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
//             ggGBAGJyYuNvI3PcWCpEZbzpcuVi4ziLZJnEaLGDfj3arCHtVBkwi6zYvzWH+bZG
//             0r2pSrPJcgmSYe0tTfkIA338HUJJT9llxy+GzIJ8u953cJURes8hfX9CRRPAbQwh
//             rOCoM9oRDaL2jqa8w9VptSSrNYgKsI51q5LxxbkapdyxcRC9QReWRl3Gt7dScJ7i
//             Y/j73YAVr/o2dbHiKNHZgEKRTAwa0+9infW76saln1u+irfZZRI2Q/YVwLNl6WgY
//             Og3/OkUwCTC24p84EF5Sl0+//duAHtHJ44jVlo9pcMULwv2CjTz6+3NdXMVEO6Q/
//             h4m1p9JocC6I3x6qBdURArNFGdSjmqx9/8lVo3MnRp6o59sq27Jhu23kXvF6CIty
//             WWn5Vbd5WelMEdyD/r6F9BQhCPSne8Xcs4hyAcUlKCQUvBTeXq/uo7vw0oblhEIY
//             yehrcF8G9JWe2QFmWwEHITRC9hsch4oQzggdyhDr4skRQkOYxYkTIEYkHU7IpRC9
//             U3kYFw==
//          -----END CERTIFICATE-----`,
//       },
//     }
//   });
