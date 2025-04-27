package com.electropaskyda.web5.Points;

import jakarta.persistence.*;

@Entity
@Table(name="points")
public class Point {
    @Id
    @SequenceGenerator(name="point_sequence", sequenceName="point_sequence", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "point_sequence")
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean result = false;

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public Double getR() {
        return r;
    }

    public Double getY() {
        return y;
    }

    public Double getX() {
        return x;
    }

    public Long getId() {
        return id;
    }

    private String username;

    public Point() {

    }
    public void check() {
        if (x < 0 && y > 0 && x > -r && y < r) {
            result = true;
        } else if (x > 0 && y > 0 && (x / 2 + y <= r / 2)) {
            result = true;
        } else result = x < 0 && y < 0 && (x * x + y * y <= r * r);
    }
}
