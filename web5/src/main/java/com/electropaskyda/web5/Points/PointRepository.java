package com.electropaskyda.web5.Points;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByUsername(String username);
}
