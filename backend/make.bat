@echo off


if %2 == 1 (echo ^<?php )>websites/as1/public/frontend/%1.php
(echo ^<?php & echo require 'utils.php'; & echo $page ='%1'; &echo require template^('frontend'^);)>websites/as1/public/%1.php
if %3 == 1 (echo ^<?php & echo require 'utils.php'; & echo if^(!$admin^) return home^(^);  & echo $page ='%1'; &echo require template^('frontend'^);)>websites/as1/public/%1.php
