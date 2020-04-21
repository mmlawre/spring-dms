# Getting Started

### IDE Setup

Download the latest Spring STS from [https://spring.io/tools](https://spring.io/tools) and extract it to a location of your choice. Then download this repository in ZIP format or import it via Git (**File -> Import -> Git**) into your workspace. 

If you run into any trouble refer to this article [https://www.lennu.net/import-git-project-into-eclipse/] (https://www.lennu.net/import-git-project-into-eclipse/).

After opening the project in Spring STS, right click on the project and select **Maven -> Update Project**.

### Database configuration

Create a database named spring-dms and configure your application.properties to reflect your instance configuration. Usually the default JDBC URL works fine if your server is a local instance and is running on port 3306. 

You need to change MySQL dialect property accordingly depending on your server version. 

Examples:

* org.hibernate.dialect.MySQL55Dialect (MySQL 5.5+)
* org.hibernate.dialect.MySQL57Dialect (MySQL 5.7+)
* org.hibernate.dialect.MySQL8Dialect (for MySQL server 8+)

### Running the application

To build the project, select ** Run as -> Maven install** from the right click drop down menu. After build process has completed without errors, you can run the application via ** Run as -> Spring Boot App**.