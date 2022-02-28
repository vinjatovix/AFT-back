db.createUser({
  user: "aft",
  pwd: "localPassword",
  roles: [
    {
      role: "readWrite",
      db: "aft"
    }
  ]
});
