package com.bikelifeservices.bikelife.services;

import com.bikelifeservices.bikelife.entities.Member;
import com.bikelifeservices.bikelife.repositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private static final short MIN_PASSWORD_SIZE = 8;

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository userRepository) {
        this.memberRepository = userRepository;
    }

    public Member getMember(String email, String password) {
        return null;
    }

    public Member createMember(Member member) {

        if (member.getPassword().length() < MIN_PASSWORD_SIZE) {
            throw new IllegalArgumentException(String.format("Password cannot be less than %d characters long", MIN_PASSWORD_SIZE));
        }

        Optional<Member> foundUser = memberRepository.findByEmail(member.getEmail());

        if (foundUser.isPresent()) {
            throw new IllegalStateException(String.format("An account already exists with %s", member.getEmail()));
        }

        return memberRepository.save(member);
    }

    public void deleteMember(Long id) {
        boolean exists = memberRepository.existsById(id);

        if (!exists) {
            throw new IllegalArgumentException(String.format("Member's id : %d does not exists", id));
        }

        memberRepository.deleteById(id);
    }
}
