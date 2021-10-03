package com.bikelifeservices.bikelife.controllers;

import com.bikelifeservices.bikelife.entities.Member;
import com.bikelifeservices.bikelife.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<Member> getMember(@RequestBody Member member) {
        Optional<Member> found = memberService.loginMember(member);
        return found
                .map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping()
    public ResponseEntity<Member> postMember(@RequestBody Member member) {
        Optional<Member> created = memberService.createMember(member);
        return created
                .map(value -> ResponseEntity.status(HttpStatus.CREATED).body(value))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.CONFLICT).body(null));
    }

    @DeleteMapping(path="{memberId}")
    public void deleteMember(@PathVariable("memberId") Long id) {
        memberService.deleteMember(id);
    }
}
