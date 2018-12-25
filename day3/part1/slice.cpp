#include <cstring>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

struct claim {
    int start_x;
    int start_y;
    int claim_x;
    int claim_y;

    claim(int sx, int sy, int cx, int cy):
	start_x(sx), start_y(sy), claim_x(cx), claim_y(cy) {}
};

claim process(const string&);
int overlaps(const vector<claim>&);

int
main(int argc, char *argv[])
{
    if (argc < 2 || argc > 3) {
	cout << "Missing <input file>" << endl;
        cout << "usage: <input file> <optional output file>" << endl;
	return 1;
    }
    ifstream fin;
    fin.open(argv[1]);
    vector<claim> claims;
    string line;
    while(getline(fin, line))
	claims.push_back(process(line));
    fin.close();

    if (argc == 3) {
	ofstream fout;
	fout.open(argv[2]);
	fout << overlaps(claims) << endl;
	fout.close();
    } else
	cout << overlaps(claims) << endl;

    return 0;
}

claim
process(const string& str)
{
    stringstream ss(str);
    string id, at, start_coord, claim_coord, sx, sy, cx, cy;
    getline(ss, id, ' ');
    getline(ss, at, ' ');
    getline(ss, start_coord, ' ');
    stringstream start_stream(start_coord);
    getline(start_stream, sx, ',');
    getline(start_stream, sy, ':');
    getline(ss, claim_coord, ' ');
    stringstream claim_stream(claim_coord);
    getline(claim_stream, cx, 'x');
    getline(claim_stream, cy);
    return claim(stoi(sx), stoi(sy), stoi(cx), stoi(cy));
}

int
overlaps(const vector<claim>& claims)
{
    int elves[1000][1000];
    memset(elves, 0, sizeof(elves));

    int size = claims.size();
    for (int i = 0; i < size; i++)
	for (int j = claims[i].start_y; j < claims[i].start_y + claims[i].claim_y; j++)
	    for (int k = claims[i].start_x; k < claims[i].start_x + claims[i].claim_x; k++)
		elves[j][k]++;

    int count = 0;
    for (int i = 0; i < 20; i++)
	for (int j = 0; j < 20; j++)
            if (elves[i][j] > 1)
		count++;

    return count;
}
