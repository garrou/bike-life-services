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

    public Optional<Member> loginMember(Member member) {
        Optional<Member> found = memberRepository.findByEmail(member.getEmail());
        return found.isPresent() && found.get().getPassword().equals(member.getPassword())
                ? found
                : Optional.empty();
    }

    public Optional<Member> createMember(Member member) {
        if (member.getPassword().length() < MIN_PASSWORD_SIZE) {
            return Optional.empty();
        }
        Optional<Member> foundUser = memberRepository.findByEmail(member.getEmail());
        return foundUser.isPresent() ? Optional.empty() : Optional.of(memberRepository.save(member));
    }

    public void deleteMember(Long id) {
        boolean exists = memberRepository.existsById(id);

        if (!exists) {
            throw new IllegalArgumentException(String.format("Member's id : %d does not exists", id));
        }
        memberRepository.deleteById(id);
    }
}
