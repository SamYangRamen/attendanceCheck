# Freshman Guide 출석체크 시스템



성균관대학교 내 신입생 교육 목적의 공인 단체 Freshman Guide에서 내부적으로 기존에 사용하던 출석체크 시스템이 뻗어버려서, 이를 대체하는 신규 시스템을 개발하고자 본 프로젝트를 시작하게 되었음



## 개발 과정

### JPA vs MyBatis?

JPA의 기능이 방대하고 거대한 것 같아서 본 프로젝트에서 사용하기에는 한계가 있는 듯

- 구글링 정보만으로는 한계를 느껴서 김영한님의 JPA 프로그래밍 교재를 구매하였음

- 스프레드시트 프로젝트의 경우 개발하면서 배워나간다는 느낌으로 JPA를 적용하였으나, 이와 달리 본 프로젝트는 당장 구현해서 실사용에 돌입해야 한다는 느낌이 강하므로, 티맥스소프트에서 익숙해져 있던 MyBatis로 변경하기로 함




## Trial And Error



### Errer Message



#### Unable to find a @SpringBootConfiguration, you need to use @ContextConfiguration or @SpringBootTest(classes=...) with your test

[스프링부트 에러\] Unable to find a @SpringBootConfiguration, you need to use @ContextConfiguration or @SpringBootTest(classes=...) with your test (tistory.com)](https://jjunii486.tistory.com/172)

`@SpringBootApplication` Annotation이 붙은 클래스가 존재하는 패키지의 하위 패키지에 테스트 코드를 두어야 한다.


