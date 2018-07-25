
var stdin = WScript.StdIn;
var stdout = WScript.StdOut;

stdout.Write("Enter N: ");
var N = parseInt(stdin.ReadLine());

function tile(N, remaining, nest, diff)
{
	var retv = 0;

	if (typeof remaining == "undefined") {
		N *= 2;
		remaining = N;
	}

	if (typeof nest === "undefined")
		nest = 0;

	if (remaining == 0)
		retv = 1;
	if (remaining >= 2)
		retv += tile(N, remaining-2, nest+1, 2);
	if (remaining >= 4)
		retv += tile(N, remaining-4, nest+1, 4);

	
	for (var i=0; i < nest; i++)
		stdout.Write(" ");
	WSH.Echo("tile: N=" + N + ", rem=" + remaining + ", diff=" + diff
			+ ", retv=" + retv);
	return retv;
}

WSH.Echo("\nResult: " + tile(N));
WSH.Quit();

