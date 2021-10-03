/*
package org.perscholas.podcaster.config;

import lombok.AllArgsConstructor;
import org.perscholas.podcaster.service.MyUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MyUserDetailsService myUserDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;



    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {

        CustomFilter mupaf = new CustomFilter();
        mupaf.setAuthenticationManager(authenticationManager());

        httpSecurity
                .csrf().disable()
                .cors().and()
                .formLogin().disable()
                .addFilterAt(
                        mupaf,
                        UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.GET, "/hello").authenticated();

        */
/*CustomFilter mupaf = new CustomFilter();
        mupaf.setAuthenticationManager(authenticationManager());
        httpSecurity
                .cors().and()
                .csrf().disable()
                .addFilterAt(
                mupaf,
                UsernamePasswordAuthenticationFilter.class)
                //.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                //.and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers("/api/v1/registration").permitAll()
                .antMatchers("/").permitAll()
                //.antMatchers("/api/v1/login").permitAll()
                .antMatchers("/api/v1/userRoles/**").hasAuthority("CREATOR")
                .anyRequest().authenticated();*//*

                    //.httpBasic()
                  */
/*  .formLogin()
                    .loginProcessingUrl("/login")
                    .defaultSuccessUrl("/hello")
                .and()
                *//*
*/
/*.rememberMe()
                    .tokenValiditySeconds((int) TimeUnit.DAYS.toSeconds(21))
                .and()*//*
*/
/*
                .logout()
                    .logoutUrl("/logout")
                //    .logoutRequestMatcher(new AntPathRequestMatcher("/logout","GET"))
                    .clearAuthentication(true)
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID","remember-me","XSRF-TOKEN")
                    //.logoutSuccessUrl("/login");*//*


        // ...
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider =  new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(myUserDetailsService);
        return provider;
    }

    */
/*@Bean
    CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }*//*


}*/
