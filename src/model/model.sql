CREATE EXTENSION "uuid-ossp";

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4() not null PRIMARY KEY,
    user_name VARCHAR(100),
    user_username VARCHAR(100),
    user_password VARCHAR(30)
);

CREATE TABLE posts(
    post_id uuid DEFAULT uuid_generate_v4() not null PRIMARY KEY,
    post_desc TEXT,
    user_id uuid,
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);