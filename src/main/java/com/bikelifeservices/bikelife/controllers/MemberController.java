package com.bikelifeservices.bikelife.controllers;

import com.bikelifeservices.bikelife.entities.Member;
import com.bikelifeservices.bikelife.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Member> getMember(String email, String password) {
        return ResponseEntity.ok().body(memberService.getMember(email, password));
    }

    @PostMapping
    public ResponseEntity<Member> postMember(@RequestBody Member member) {
        return ResponseEntity.ok().body(memberService.createMember(member));
    }

    @DeleteMapping(path="{memberId}")
    public void deleteMember(@PathVariable("memberId") Long id) {
        memberService.deleteMember(id);
    }
}
