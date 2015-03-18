


var cctypes=[{type:'Visa',      prefixes:'4',              length:'16'},
                 {type:'MsterCard', prefixes:'51,52,53,54,55', length:'16'},
                 {type:'AmEx',      prefixes:'34,37',          length:'15'}];

var prefixArray = cctypes[2].prefixes.split(',');
var j;

for (j = 0; j < cctypes[1].prefixes.split(',').length; j++) {
    console.log(cctypes[1].prefixes.split(',')[j]);
}
