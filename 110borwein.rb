# !/usr/bin/env ruby
# EPITECH PROJECT, 2024
# 110borwein
# File description:
# last project of maths module

include Math

def get_input_value
    ARGV[0]
end


def help
    puts "USAGE"
    puts "   ./110borwein n\n"
    puts "DESCRIPTION"
    puts " n   constant defining the integral to be computed"
    return 0
end

def evaluate_borwein(n, x)
    somme = 1
    return 1 if x == 0
    (0..n).each do |i|
        den1 = (2 * i) + 1
        den2 = (x / den1)
        somme *= sin(den2) / den2
    end
    return somme
end

def midpoint(a, b, n)
    c = b - a
    return c * evaluate_borwein(n, (a + b) / 2)
end

def trapezoid(a, b, n)
    c = (b - a) / 2
    m = evaluate_borwein(n, a)
    n = evaluate_borwein(n, b)
    o = m + n
    return c * o
end

def simpson(a, b, n)
    c = (b - a) / 6
    d = evaluate_borwein(n, a)
    e = 4 * evaluate_borwein(n, (a + b) / 2)
    f = evaluate_borwein(n, b)
    o = d + e + f
    return c * o
end

def for_midpoint(n)
    a = 0
    b = 0.5
    somme = 0

    while b <= 5000
        somme += midpoint(a, b, n)
        a = b
        b += 0.5
    end
    liste = [somme, (somme - (PI / 2)).abs]
    return liste
end

def for_trapezoid(n)
    a = 0
    b = 0.5
    somme = 0

    while b <= 5000
        somme += trapezoid(a, b, n)
        a = b
        b += 0.5
    end
    liste = [somme, (somme - (PI / 2)).abs]
    return liste
end

def for_simpson(n)
    a = 0
    b = 0.5
    somme = 0

    while b <= 5000
        somme += simpson(a, b, n)
        a = b
        b += 0.5
    end
    liste = [somme, (somme - (PI / 2)).abs]
    return liste
end

def calculate_integral(input_value)
    begin
        n = Integer(input_value)
    rescue ArgumentError
        exit(84)
    end
    exit(84) if n < 0
    liste1 = for_midpoint(n)
    liste2 = for_trapezoid(n)
    liste3 = for_simpson(n)
    puts "Midpoint:"
    puts "I#{n} = %.10f\ndiff = %.10f\n" % [liste1[0], liste1[1].abs]
    puts "Trapezoidal:"
    puts "I#{n} = %.10f\ndiff = %.10f\n" % [liste2[0], liste2[1].abs]
    puts "Simpson:"
    puts "I#{n} = %.10f\ndiff = %.10f" % [liste3[0], liste3[1].abs]
    return 0
end

def main
    input_value = get_input_value
    result = calculate_integral(input_value)
end

main if __FILE__ == $0
