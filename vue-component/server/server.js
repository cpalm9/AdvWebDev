'use strict';
const express = require('express');

module.exports = function() {
    return new Promise((resolve, reject) => {
        const app = express();

        app.get('/api/the-mummy', (req, res) => {
            res.json({
                "Search":[
                    {"Title":"The Mummy","Year":"1999","imdbID":"tt0120616","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BM2FmZTk5NDUtMzU0Yy00NzgzLWI0Y2MtMjExOWJmMmFlNzk1L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
                    {"Title":"The Mummy Returns","Year":"2001","imdbID":"tt0209163","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjE2NzU1NTk2MV5BMl5BanBnXkFtZTgwMjIwMzcxMTE@._V1_SX300.jpg"},
                    {"Title":"The Mummy: Tomb of the Dragon Emperor","Year":"2008","imdbID":"tt0859163","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4NDIzMDY1OV5BMl5BanBnXkFtZTcwNjQxMzk3MQ@@._V1_SX300.jpg"},
                    {"Title":"The Mummy","Year":"2017","imdbID":"tt2345759","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BODg1NTIxMzEtM2NmMi00MDQ2LWE5YjYtZTgxYmNhZTQxYWIzXkEyXkFqcGdeQXVyNDYzODU1ODM@._V1_SX300.jpg"},
                    {"Title":"The Mummy","Year":"1932","imdbID":"tt0023245","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyNTIzNzcyMV5BMl5BanBnXkFtZTgwOTgwODY2MTE@._V1_SX300.jpg"},
                    {"Title":"The Mummy","Year":"1959","imdbID":"tt0053085","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BN2M3NzlkZTItYTFmZS00Y2RhLThlYTYtYTk1YjJiOTZiYWQyXkEyXkFqcGdeQXVyMTE2NzA0Ng@@._V1_SX300.jpg"},
                    {"Title":"Abbott and Costello Meet the Mummy","Year":"1955","imdbID":"tt0047795","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZGJjYTMwODgtNGFhZC00ZmIwLTllYTgtMGY2Mzk0OThlODJiXkEyXkFqcGdeQXVyNjE5MjUyOTM@._V1_SX300.jpg"},
                    {"Title":"Tale of the Mummy","Year":"1998","imdbID":"tt0127919","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5NjcyNDc1Ml5BMl5BanBnXkFtZTYwMTk0Mjk4._V1_SX300.jpg"},
                    {"Title":"The Aztec Mummy Against the Humanoid Robot","Year":"1958","imdbID":"tt0050717","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYTAyODI0N2YtYzMxMi00MDZlLTk4MjctOWQ3YjQ3NTIwZWVjXkEyXkFqcGdeQXVyNTc4Njg5MjA@._V1_SX300.jpg"},
                    {"Title":"The Mummy Resurrected","Year":"2014","imdbID":"tt3382842","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5Njg5ODg0M15BMl5BanBnXkFtZTgwNTA0NTAxMjE@._V1_SX300.jpg"}
                    ],
                "totalResults":"100",
                "Response":"True"
            });
        });

        app.use(express.static(__dirname + '/../public'));

        const listener = app.listen(err => {
            if (err) return reject(err);
            const result = {
                port: listener.address().port,
                stop: () => new Promise((resolve, reject) => {
                    listener.close(err => {
                        if (err) return reject(err);
                        resolve();
                    });
                })
            };
            resolve(result);
        });
    });
};