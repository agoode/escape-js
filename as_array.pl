#!/usr/bin/perl -w

use strict;
use bytes;

print "var level=[";

undef $/;

while(<>) {
  my @a = split //;
  print join ',', map (ord, @a);
}

print "];\n";
