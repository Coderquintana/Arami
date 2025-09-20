package com.arami.customer;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;

public class DbVersionProbe {
    public static void main(String[] args) throws Exception {
        String url = System.getProperty("jdbc.url", "jdbc:postgresql://localhost:5432/aramidb");
        String user = System.getProperty("jdbc.user", "arami");
        String pass = System.getProperty("jdbc.pass", "arami");
        System.out.println("Connecting to: " + url + " as " + user);
        try (Connection c = DriverManager.getConnection(url, user, pass)) {
            DatabaseMetaData md = c.getMetaData();
            System.out.println("Product name: " + md.getDatabaseProductName());
            System.out.println("Product version: " + md.getDatabaseProductVersion());
            System.out.println("Driver name: " + md.getDriverName());
            System.out.println("Driver version: " + md.getDriverVersion());
        }
    }
}
