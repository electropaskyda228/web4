package com.electropaskyda.web5.Users;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.SecureRandom;

@Entity
@Table(name="users")
public class User {
    @Id
    @SequenceGenerator(name="user_sequence", sequenceName="user_sequence", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "user_sequence")
    private Long id;
    private String username;
    private String password;
    private String sault = null;
    @Transient
    private final static String pepper = "gangsta";
    @Transient
    private static final SecureRandom random = new SecureRandom();
    @Transient
    private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";



    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSault(String sault) {
        this.sault = sault;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getSault() {
        return sault;
    }

    public User() {sault = generateRandomString(8);}

    private static String getHash(String input) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashBytes = digest.digest(input.getBytes());

        StringBuilder hexString = new StringBuilder();
        for (byte b : hashBytes) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }

    public void prepareForSaving() {
        if (sault == null) {
            sault = generateRandomString(8);
        }
        try {
            password = User.getHash(pepper + password + sault);
        } catch (Exception err) {}
    }

    public boolean comparePassword(User anotherUser) {
        try{
            return anotherUser.getPassword().equals(User.getHash(pepper + password + anotherUser.getSault()));
        } catch (Exception err) {
            return false;
        }

    }

    public static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        int base = ALPHABET.length();
        BigInteger limit = BigInteger.TEN.pow(130);

        while (sb.length() < length) {
            BigInteger num = new BigInteger(130, random);
            if (num.compareTo(limit) < 0) {
                String token = new BigInteger(num.toByteArray()).toString(base);
                sb.append(token); // Добавляем строку в буфер
            }
        }

        return sb.substring(0, length); // Возвращаем строку заданной длины
    }
}
