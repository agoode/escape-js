#!/usr/bin/perl -w

use strict;
use bytes;

my $name = substr $ARGV[0], 0, -4;

print "global.levels.$name = [";

undef $/;

while(<>) {
  my @a = split //;
  print join ',', map (ord, @a);
}

print "];\n";
