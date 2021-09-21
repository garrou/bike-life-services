package com.bikelifeservices.bikelife.controllers;

import com.bikelifeservices.bikelife.entities.Member;
import com.bikelifeservices.bikelife.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public Member getMember(String email, String password) {
        return memberService.getMember(email, password);
    }

    @PostMapping
    public Member postMember(@RequestBody Member toAdd) {
        return memberService.createMember(toAdd);
    }

    @DeleteMapping(path="{memberId}")
    public void deleteMember(@PathVariable("memberId") Long id) {
        memberService.deleteMember(id);
    }
}
