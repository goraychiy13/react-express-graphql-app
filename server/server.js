const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');
const config = require('config');
// const mongoose = require('mongoose');

// app.use('/api/')

const PORT = config.get('port') || 5000;

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });

const schema = buildSchema(schemaString);

const allSchools = [
    {
        id: '1',
        schoolName: 'First school',
        totalStudents: '590',
        rating: '7.8',
        headTeacher: {
            id: '1',
            firstName: 'Ivan',
            lastName: 'Ivanov',
        }
    },
    {
        id: '2',
        schoolName: 'Second school',
        totalStudents: '672',
        rating: '8.1',
        headTeacher : {
            id: '1',
            firstName: 'Petr',
            lastName: 'Petrov',
        }
    },
]

const root = {
    getAllSchools: () => {
        return allSchools;
    },
    getSchool: params => {
        return allSchools.find(({ id }) => params.id === id);
    },
    addNewSchool: params => {
        allSchools.push({
            id: allSchools.length + 1,
            ...params.school,
            schoolName: `${allSchools.length + 1} school`,
            totalStudents: (Math.random() * 700).toString(),
            rating: (Math.random()*10).toString(),
            headTeacher: {
                id: '1',
                firstName: 'Sergey',
                lastName: 'Sergeev',
            }
        });

        return true;
    }
};

 
const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

// async function start() {
//     try {
//         // await mongoose.connect(config.get('mongoUri'), {})
//     } catch (e) {
//         console.log('Server Error', e.message)
//         process.exit(1)
//     }
// }

// start();

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))