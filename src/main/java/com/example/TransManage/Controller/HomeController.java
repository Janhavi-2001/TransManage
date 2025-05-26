package com.example.TransManage.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    // This forwards all routes that aren't static files to index.html
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forwardToIndex() {
        return "forward:/";
    }
}
