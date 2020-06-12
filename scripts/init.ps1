echo "###BACK-END###"
echo "1. restoring project..."
dotnet restore ..\back-end\
echo "2. building backend"
dotnet build ..\back-end\
echo "###FRONT-END###"
echo "1. installing dependencies..."
cd ..\front-end
yarn install
cd ..\scripts