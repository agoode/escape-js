#!/usr/bin/perl -w

use strict;
use bytes;

print "<script type=\"text/javascript\">\n<!--\nvar level=[";

undef $/;

while(<>) {
  my @a = split //;
  print join ',', map (ord, @a);
}

print "];//\n-->\n</script>\n";
