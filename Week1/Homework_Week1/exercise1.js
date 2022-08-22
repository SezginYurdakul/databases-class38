const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_MEETUP_DATABASE = "CREATE DATABASE IF NOT EXISTS meetup";

  const CREATE_INVITEE_TABLE = ` 
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT,
    invitee_name VARCHAR(100),
    invited_by VARCHAR(100)
  );`;

  const CREATE_ROOM_TABLE = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT,
    room_name VARCHAR(100),
    floor_number INT
  );`;

  const CREATE_MEETING_TABLE = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT,
    meeting_title VARCHAR(100),
    starting_time TIME,
    ending_time TIME,
    room_no INT
  );`;

  const invitees = [
    { invitee_no: 1, invitee_name: "Person1", invited_by: "Manager1" },
    { invitee_no: 2, invitee_name: "Person2", invited_by: "Manager1" },
    { invitee_no: 3, invitee_name: "Person3", invited_by: "Manager2" },
    { invitee_no: 4, invitee_name: "Person4", invited_by: "Manager2" },
    { invitee_no: 5, invitee_name: "Person5", invited_by: "Manager3" },
  ];
  const rooms = [
    { room_no: 1, room_name: "Room1", floor_number: 1 },
    { room_no: 2, room_name: "Room2", floor_number: 2 },
    { room_no: 3, room_name: "Room3", floor_number: 3 },
    { room_no: 4, room_name: "Room4", floor_number: 4 },
    { room_no: 5, room_name: "Room5", floor_number: 5 },
  ];

  const meetings = [
    {
      meeting_no: 1,
      meeting_title: "Meeting1",
      starting_time: "10:00",
      ending_time: "12:00",
      room_no: 1,
    },
    {
      meeting_no: 2,
      meeting_title: "Meeting1",
      starting_time: "10:00",
      ending_time: "12:00",
      room_no: 2,
    },
    {
      meeting_no: 3,
      meeting_title: "Meeting1",
      starting_time: "10:00",
      ending_time: "12:00",
      room_no: 3,
    },
    {
      meeting_no: 4,
      meeting_title: "Meeting1",
      starting_time: "10:00",
      ending_time: "12:00",
      room_no: 4,
    },
    {
      meeting_no: 5,
      meeting_title: "Meeting1",
      starting_time: "10:00",
      ending_time: "12:00",
      room_no: 5,
    },
  ];

  connection.connect();

  try {
    await Promise.all[
      (execQuery(CREATE_MEETUP_DATABASE),
      execQuery(CREATE_ROOM_TABLE),
      execQuery(CREATE_INVITEE_TABLE),
      execQuery(CREATE_MEETING_TABLE))
    ];
    await Promise.all(
      invitees.map((invitee) =>
        execQuery("INSERT INTO Invitee SET ?", invitee)
      ),
      rooms.map((room) => execQuery("INSERT INTO Room SET ?", room)),
      meetings.map((meeting) => execQuery("INSERT INTO Meeting SET ?", meeting))
    );
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

seedDatabase();
