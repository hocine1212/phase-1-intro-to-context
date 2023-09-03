// Your code here
function createEmployeeRecord(arr) {
  const obj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return obj;
}
function createEmployeeRecords(arrs) {
  const employees = arrs.map((arr) => createEmployeeRecord(arr));
  return employees;
}

function createTimeInEvent(employee, dateAndTime) {
  const dateTime = dateAndTime.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateTime[1]),
    date: dateTime[0],
  });
  return employee;
}
function createTimeOutEvent(employee, dateAndTime) {
  const dateTime = dateAndTime.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateTime[1]),
    date: dateTime[0],
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(
    (record) => record.date === date
  );
  const timeOutEvent = employee.timeOutEvents.find(
    (record) => record.date === date
  );

  const timeIn = timeInEvent.hour;
  const timeOut = timeOutEvent.hour;
  const hoursWorked = timeOut - timeIn;
  return hoursWorked / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const wagesEarned = hoursWorked * employee.payPerHour;
  return wagesEarned;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map((event) => event.date);
  const allWagesForEmployee = dates.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
  return allWagesForEmployee;
}
function calculatePayroll(arr) {
  const totalPayroll = arr.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );

  return totalPayroll;
}
