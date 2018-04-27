import Joi from 'joi'

require("dotenv").config();



//  建立每個變數的 joi 驗證規則
const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .default("development")
      .allow(["development", "production"]),
    PORT: Joi.number().default(3000),
    MYSQL_PORT: Joi.number().default(3306), //數字且預設值為3306
    MYSQL_HOST: Joi.string().default("127.0.0.1"), //字串取預設值為127.0.0.1
    MYSQL_USER: Joi.string(), // 字串
    MYSQL_PASS: Joi.string(), // 字串
    MYSQL_NAME: Joi.string(), // 字串
    VERSION: Joi.string()
  })
  .unknown()
  .required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = Joi.validate(process.env, envVarSchema);
// const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
//result --> { error: null, value: { username: 'abc', birthyear: 1994 } }
//result.error === null, 说明校验通过 ,result.value校验的对象


if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  version: envVars.VERSION,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysqlPort: envVars.MYSQL_PORT, // 連接阜號(MYSQL_PORT)
  mysqlHost: envVars.MYSQL_HOST, // 主機名稱 (MYSQL_HOST)
  mysqlUserName: envVars.MYSQL_USER, // 用戶名稱 (MYSQL_USER)
  mysqlPass: envVars.MYSQL_PASS, // 資料庫密碼(MYSQL_PASS)
  mysqlDatabase: envVars.MYSQL_DATABASE // 資料庫名稱(MYSQL_DATABASE)
};
// const config = {
//   version: '1.0.0',
//   env: 'development',
//   port: '3000'
// };

export default config;
