package com.electropaskyda.web5.Points;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointService {

    private final PointRepository pointRepository;
    @Autowired
    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public List<Point> getPointsByUsername(String username) {
        return pointRepository.findByUsername(username);
    }

    public Point createPoint(Point point) {
        point.check();
        return pointRepository.save(point);
    }
}
