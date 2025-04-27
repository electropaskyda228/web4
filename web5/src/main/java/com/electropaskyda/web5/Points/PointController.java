package com.electropaskyda.web5.Points;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PointController {
    private final PointService pointService;

    @Autowired
    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @GetMapping("get-all-points/{username}")
    public List<Point> getAllPoints(@PathVariable String username) {
        return pointService.getPointsByUsername(username);
    }

    @PostMapping("create-point")
    public Point createPoint(@RequestBody Point point) {
        return pointService.createPoint(point);
    }

}
